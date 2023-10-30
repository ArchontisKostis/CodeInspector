from sqlalchemy import Integer, Column, String

from app.db.entities import Base


class ProjectCommitTable(Base):
    __tablename__ = "project_commit"

    id = Column(Integer, primary_key=True, autoincrement=True)
    analysis_id = Column(Integer, nullable=False)
    hash = Column(String(50))
    author = Column(String(255))
    committer = Column(String(255))
    author_date = Column(String(255))
    author_email = Column(String(255))
    committer_email = Column(String(255))
    committer_date = Column(String(255))
    number_of_deleted_lines = Column(Integer)
    number_of_added_lines = Column(Integer)
    number_of_files_changed = Column(Integer)
    dmm_unit_size = Column(Integer)
    dmm_unit_complexity = Column(Integer)
    dmm_unit_interfacing = Column(Integer)
    dmm_score = Column(Integer)
    change_category = Column(String(255), default='UNKNOWN')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'hash': self.hash,
            'author': self.author,
            'committer': self.committer,
            'author_date': self.author_date,
            'author_email': self.author_email,
            'committer_email': self.committer_email,
            'committer_date': self.committer_date,
            'number_of_deleted_lines': self.number_of_deleted_lines,
            'number_of_added_lines': self.number_of_added_lines,
            'number_of_files_changed': self.number_of_files_changed,
            'dmm_unit_size': self.dmm_unit_size,
            'dmm_unit_complexity': self.dmm_unit_complexity,
            'dmm_unit_interfacing': self.dmm_unit_interfacing,
            'dmm_score': self.dmm_score,
            'change_category': self.change_category
        }