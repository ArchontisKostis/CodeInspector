from app.db.entities.CommitAnalysisTable import CommitAnalysisTable
from app.db.entities.FileMetricsTable import FileMetricsTable
from app.db.entities.HotspotAnalysisTable import HotspotAnalysisTable
from app.db.entities.ProjectCommitTable import ProjectCommitTable
from app.db.entities.ProjectFileTable import ProjectFileTable
from app.db.entities.ProjectTable import ProjectTable
from app.models.analysis.CommitAnalysis import CommitAnalysis
from app.models.analysis.PriorityAnalysis import PriorityAnalysis
from app.models.project_commit.ProjectCommitBuilder import ProjectCommitBuilder
from app.models.project_file.PriorityType import PriorityType
from app.models.project_file.ProjectFile import RepoFile


class DatabaseService:
    def __init__(self, session):
        self.session = session

    def save_project(self, project):
        db_project = ProjectTable()
        db_project.project_name = project.project_name
        db_project.repository_url = project.repository_url

        self.session.add(db_project)
        self.session.commit()
        self.session.refresh(db_project)

        return db_project

    def save_hotspot_analysis(self, analyzer, db_project, from_date, to_date, project_files):
        # Create a new HotspotAnalysisTable and save it to the database
        db_analysis = HotspotAnalysisTable()
        db_analysis.project_id = db_project.id

        self.session.add(db_analysis)
        self.session.commit()
        self.session.refresh(db_analysis)

        # Get the max CC and Churn files
        max_cc_file = analyzer.project_analysis.max_complexity_file
        max_churn_file = analyzer.project_analysis.max_churn_file

        # Now save the files
        for file in project_files:
            db_file = ProjectFileTable()
            db_file.project_id = db_project.id
            db_file.name = file.name
            db_file.priority = file.priority
            db_file.hotspot_analysis_id = db_analysis.id

            self.session.add(db_file)
            self.session.commit()
            self.session.refresh(db_file)

            if file == max_cc_file:
                max_cc_file = db_file

            if file == max_churn_file:
                max_churn_file = db_file

            metrics_table = FileMetricsTable()
            metrics_table.file_id = db_file.id
            metrics_table.cc = file.get_metric('cc')
            metrics_table.loc = file.get_metric('nloc')
            metrics_table.churn = file.get_metric('churn')

            self.session.add(metrics_table)
            self.session.commit()
            self.session.refresh(metrics_table)

        db_analysis.project_id = db_project.id
        db_analysis.from_date = from_date
        db_analysis.to_date = to_date
        db_analysis.total_lines_of_code = analyzer.project_analysis.total_nloc
        db_analysis.max_churn_file_id = max_churn_file.id
        db_analysis.max_complexity_file_id = max_cc_file.id
        db_analysis.average_churn = analyzer.project_analysis.avg_churn
        db_analysis.average_nloc = analyzer.project_analysis.avg_nloc
        db_analysis.average_complexity = analyzer.project_analysis.avg_complexity
        db_analysis.total_lines_of_code = analyzer.project_analysis.total_nloc
        db_analysis.total_files = analyzer.project_analysis.total_files
        db_analysis.total_prioritized_files = analyzer.project_analysis.total_prioritized_files
        db_analysis.total_outliers = analyzer.project_analysis.total_outliers

        self.session.add(db_analysis)
        self.session.commit()
        self.session.refresh(db_analysis)

        self.session.close()

    def save_commit_analysis(self, db_project, from_date, to_date, commit_analysis):
        db_analysis = CommitAnalysisTable()
        db_analysis.project_id = db_project.id
        db_analysis.from_date = from_date
        db_analysis.to_date = to_date
        db_analysis.total_commits = len(commit_analysis.commits)

        self.session.add(db_analysis)
        self.session.commit()
        self.session.refresh(db_analysis)

        for commit in commit_analysis.commits:
            db_commit = ProjectCommitTable()
            db_commit.analysis_id = db_analysis.id
            db_commit.hash = commit.hash
            db_commit.committer = commit.committer
            db_commit.author = commit.author
            db_commit.committer_date = commit.committer_date
            db_commit.author_date = commit.author_date
            db_commit.number_of_added_lines = commit.number_of_added_lines
            db_commit.number_of_deleted_lines = commit.number_of_deleted_lines
            db_commit.number_of_files_changed = commit.number_of_files_changed
            db_commit.author_email = commit.author_email
            db_commit.committer_email = commit.committer_email
            db_commit.dmm_unit_interfacing = commit.dmm_unit_interfacing
            db_commit.dmm_unit_complexity = commit.dmm_unit_complexity
            db_commit.dmm_unit_size = commit.dmm_unit_size
            db_commit.dmm_score = commit.dmm_score
            db_commit.change_category = str(commit.change_category)

            self.session.add(db_commit)
            self.session.commit()
            self.session.refresh(db_commit)

        self.session.close()

    def get_commit_analysis_by_project_url(self, project_url):
        project_table = self.session.query(ProjectTable).filter(
            ProjectTable.repository_url == project_url
        ).first()

        project_id = project_table.id  # get the project id

        commit_analysis_table = self.session.query(CommitAnalysisTable).filter(
            CommitAnalysisTable.project_id == project_id
        ).first()

        db_commits = self.session.query(ProjectCommitTable).filter(
            ProjectCommitTable.analysis_id == commit_analysis_table.id
        ).all()

        commit_analysis = CommitAnalysis(
            project_table.id,
            commit_analysis_table.from_date,
            commit_analysis_table.to_date
        )

        commit_analysis.project_name = project_table.project_name
        commits = []

        for db_commit in db_commits:
            builder = ProjectCommitBuilder()
            commit = builder \
                .set_hash(db_commit.hash) \
                .set_committer(db_commit.committer) \
                .set_author(db_commit.author) \
                .set_committer_date(db_commit.committer_date) \
                .set_author_date(db_commit.author_date) \
                .set_number_of_added_lines(db_commit.number_of_added_lines) \
                .set_number_of_deleted_lines(db_commit.number_of_deleted_lines) \
                .set_number_of_files_changed(db_commit.number_of_files_changed) \
                .set_author_email(db_commit.author_email) \
                .set_committer_email(db_commit.committer_email) \
                .set_dmm_unit_interfacing(db_commit.dmm_unit_interfacing) \
                .set_dmm_unit_complexity(db_commit.dmm_unit_complexity) \
                .set_dmm_unit_size(db_commit.dmm_unit_size) \
                .build()

            commit.dmm_score = db_commit.dmm_score
            commit.change_category = db_commit.change_category

            commits.append(commit)

        commit_analysis.commits = commits

        return commit_analysis

    def get_hotspot_analysis_by_project_url(self, project_url):
        # Find the Project
        project_table = self.session.query(ProjectTable).filter(
            ProjectTable.repository_url == project_url
        ).first()

        project_id = project_table.id  # get the project id

        db_hotspot_analysis = self.session.query(HotspotAnalysisTable).filter(
            HotspotAnalysisTable.project_id == project_id
        ).first()

        db_project_files = self.session.query(ProjectFileTable).filter(
            ProjectFileTable.hotspot_analysis_id == db_hotspot_analysis.id
        ).all()

        max_cc_file_metrics_db = self.session.query(FileMetricsTable).filter(
            FileMetricsTable.id == db_hotspot_analysis.max_complexity_file_id
        ).first()

        max_cc_file_db = self.session.query(ProjectFileTable).filter(
            ProjectFileTable.id == db_hotspot_analysis.max_complexity_file_id
        ).first()

        max_churn_file_db = self.session.query(ProjectFileTable).filter(
            ProjectFileTable.id == db_hotspot_analysis.max_churn_file_id
        ).first()

        max_churn_file_metrics_db = self.session.query(FileMetricsTable).filter(
            FileMetricsTable.id == db_hotspot_analysis.max_churn_file_id
        ).first()

        max_cc_file = RepoFile(max_cc_file_db.name)
        max_cc_file.priority = max_cc_file_db.priority
        max_cc_file.set_metric('CC', max_cc_file_metrics_db.cc)
        max_cc_file.set_metric('NLOC', max_cc_file_metrics_db.loc)
        max_cc_file.set_metric('CHURN', max_cc_file_metrics_db.churn)

        max_churn_file = RepoFile(max_churn_file_db.name)
        max_churn_file.priority = max_churn_file_db.priority
        max_churn_file.set_metric('CC', max_churn_file_metrics_db.cc)
        max_churn_file.set_metric('NLOC', max_churn_file_metrics_db.loc)
        max_churn_file.set_metric('CHURN', max_churn_file_metrics_db.churn)

        hotspots = []
        outlier_files = []
        for db_project_file in db_project_files:
            file = RepoFile(db_project_file.name)
            file.priority = db_project_file.priority

            file_metrics_db = self.session.query(FileMetricsTable).filter(
                FileMetricsTable.file_id == db_project_file.id
            ).first()

            file.set_metric('CC', file_metrics_db.cc)
            file.set_metric('NLOC', file_metrics_db.loc)
            file.set_metric('CHURN', file_metrics_db.churn)

            if file.priority == 'PriorityType.NOT_SET':
                file.priority = PriorityType.NOT_SET
                outlier_files.append(file)
            else:
                hotspots.append(file)
                if file.priority == 'PriorityType.HIGH':
                    file.priority = PriorityType.HIGH
                elif file.priority == 'PriorityType.MEDIUM':
                    file.priority = PriorityType.MEDIUM
                elif file.priority == 'PriorityType.LOW':
                    file.priority = PriorityType.LOW
                elif file.priority == 'PriorityType.NORMAL':
                    file.priority = PriorityType.NORMAL
                elif file.priority == 'PriorityType.UNKNOWN':
                    file.priority = PriorityType.UNKNOWN

        hotspot_analysis = PriorityAnalysis(
            project_table.repository_url,
            db_hotspot_analysis.from_date,
            db_hotspot_analysis.to_date
        )

        hotspot_analysis.project_name = project_table.project_name
        hotspot_analysis.prioritized_files = hotspots
        hotspot_analysis.outliers = outlier_files
        hotspot_analysis.max_complexity_file = max_cc_file
        hotspot_analysis.max_churn_file = max_churn_file
        hotspot_analysis.avg_complexity = db_hotspot_analysis.average_complexity
        hotspot_analysis.avg_churn = db_hotspot_analysis.average_churn
        hotspot_analysis.avg_nloc = db_hotspot_analysis.average_nloc
        hotspot_analysis.total_nloc = db_hotspot_analysis.total_lines_of_code
        hotspot_analysis.total_files = db_hotspot_analysis.total_files
        hotspot_analysis.total_prioritized_files = db_hotspot_analysis.total_prioritized_files
        hotspot_analysis.total_outliers = len(outlier_files)