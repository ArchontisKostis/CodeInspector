from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import Mapped, relationship

from app.db.entities import Base


class ProjectTable(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_name = Column(String(255), default='Undefined Project Name')
    repository_url = Column(String(255))

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'repository_url': self.repository_url,
        }
