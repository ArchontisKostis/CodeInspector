from sqlalchemy import Column, Integer, String

from app.db.entities import Base


class HotspotAnalysisTable(Base):
    __tablename__ = "hotspot_analysis"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, nullable=False)
    from_date = Column(String(255), default='Undefined From Date')
    to_date = Column(String(255), default='Undefined To Date')

    total_lines_of_code = Column(Integer, default=0)
    total_files = Column(Integer, default=0)
    total_prioritized_files = Column(Integer, default=0)
    total_outliers = Column(Integer, default=0)
    max_churn_file_id = Column(Integer)
    max_complexity_file_id = Column(Integer)
    average_churn = Column(Integer, default=0)
    average_complexity = Column(Integer, default=0)
    average_nloc = Column(Integer, default=0)


    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'from_date': self.from_date,
            'to_date': self.to_date,
            'total_lines_of_code': self.total_lines_of_code,
            'max_churn_file': self.max_churn_file,
            'max_complexity_file': self.max_complexity_file,
            'average_churn': self.average_churn,
            'average_complexity': self.average_complexity,
        }