from pydantic import BaseModel
from datetime import datetime

class todo(BaseModel):
    id: int
    item: str
    writer: str
    time: datetime