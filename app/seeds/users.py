from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', icon ='https://i.imgur.com/sWy6Lnw.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', icon ='https://i.imgur.com/sWy6Lnw.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', icon ='https://i.imgur.com/sWy6Lnw.png')
    user5 = User(
        username='zhuoxin', email='zhuoxin@aa.io', password='password', icon='https://i.imgur.com/z8CiLIY.png', )
    user6 = User(
        username='alexandertheartist', email='alexander@aa.io', password='password', icon='https://i.imgur.com/SRTRK7S.png', )
    user7 = User(
        username='flulemaity', email='flulematiy@aa.io', password='password', icon='https://i.imgur.com/j6hXb7F.png', )
    user8 = User(
        username='dollythedancer', email='dolly@aa.io', password='password', icon='https://i.imgur.com/euqVH5z.png',)
    user9 = User(
        username='art_thou', email='harry@aa.io', password='password', icon='https://i.imgur.com/iCNi0A9.png', )
    user10 = User(
        username='mervstheword', email='merv@aa.io', password='password', icon='https://i.imgur.com/oZUjm7O.png', )
    user11 = User(
        username='artgod', email='artgod@aa.io', password='password', icon='https://i.imgur.com/wLdTcGQ.png', )
    user12 = User(
        username='vanDough', email='vadough@aa.io', password='password', icon='https://i.imgur.com/oZUjm7O.png', )
    user13 = User(
        username='callen_shaub', email='callen@aa.io', password='password', icon='https://i.imgur.com/tVZPwDr.png', )
    user14 = User(
        username='oil_paintings', email='oil@aa.io', password='password', icon='https://i.imgur.com/7TYdoF2.png', )
    user15 = User(
        username='marvelousmonet', email='monet@aa.io', password='password', icon='https://i.imgur.com/3JU5Kuc.png', )
    user1 = User(
        username='thearts', email='streetarts@aa.io', password='password', icon='https://i.imgur.com/mniUYaK.png',)

    db.session.add(demo)
    db.session.add(user1)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
