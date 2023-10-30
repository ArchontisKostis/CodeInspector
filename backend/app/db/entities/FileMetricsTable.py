from sqlalchemy import Column, Integer

from app.db.entities import Base


class FileMetricsTable(Base):
    __tablename__ = "file_metrics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    file_id = Column(Integer, nullable=False)
    cc = Column(Integer)
    loc = Column(Integer)
    churn = Column(Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'file_id': self.file_id,
            'cc': self.cc,
            'loc': self.loc,
            'churn': self.churn
        }