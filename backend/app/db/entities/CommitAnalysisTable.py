from sqlalchemy import Integer, Column, Date

from app.db.entities import Base


class CommitAnalysisTable(Base):
    __tablename__ = "commit_analysis"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, nullable=False)
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    total_commits = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'repo_url': self.repo_url,
            'from_date': self.from_date,
            'to_date': self.to_date,
            'commits': [commit.to_dict() for commit in self.commits],
            'total_commits': self.total_commits
        }
