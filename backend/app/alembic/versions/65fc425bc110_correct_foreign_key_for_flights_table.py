"""correct foreign key for flights table

Revision ID: 65fc425bc110
Revises: 1a31ce608336
Create Date: 2024-10-15 15:27:35.078990

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '65fc425bc110'
down_revision = '1a31ce608336'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
