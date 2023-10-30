from sqlalchemy import Integer, Column, String
from app.db.entities import Base


class ProjectFileTable(Base):
    __tablename__ = "project_file"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), default='Undefined File Name')
    priority = Column(String(255), default='NOT_SET')
    project_id = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'priority': self.priority,
            'project_id': self.project_id
        }
