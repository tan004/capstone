from app.models import db, Restaurant


def seed_reaturants():
    post1 = Restaurant(title='Liuyishou hotpot', phone='6502421245', description='Come try our authentic Chongqing Hotpot. In Liuyishou, you can always find a broth that fit you and the spicniness that you dream of!', address='98 E 3rd ave', city='San Mateo',
                       state='California', zip_code='94401', owner_id=1, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/Qp3HKahiznh_1Qt8mOGB_Q/o.jpg')

    post2 = Restaurant(title='Mokutanya', phone='6503489388', description="Mokutanya is a yakitori charcoal grill and ramen restaurant. From the moment you step into Mokutanya, our bubbly, cheerful hostess and friendly, attentive wait staff will instantly make you feel at ease and welcomed. At Mokutanya, we just don't want to treat you as a customer. We want to treat everyone as good friends where they can be frank with us and share their opinions. We listen to our friends, accept their suggestions and continuously strive on making improvement to make them happy. All we request is for you to kick back to enjoy everything we have to offer.",
                       address='1155 California Dr ste G', state='California', city='Burlingame', zip_code='94010',
                       owner_id=1, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/QPpP7pP4CC20CfSVbkrDZw/o.jpg')

    post3 = Restaurant(title='Mumu hotpot', phone='6502421945', description="""
    Our restaurant has been doing hotpot for over last many years in Sunnyvale and Foster City.
        We strive to offer our guests with the ultimate AYCE (all you can eat). Chinese and Vegetarian fusion dining
        experience that is truly unforgettable. our guests have the option of choosing many dishes!
        Mumu Hot Pot offers a kind dining experience unlike anywhere else.
    """,
                       address='1099 foster square ln', state='California', city='Foster City', zip_code='94404',
                       owner_id=1, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/QY1Oz6tpz7f91L_syiUH-Q/o.jpg')

    post4 = Restaurant(title='Boiling hopot', phone='4152211188', description="""
    We are offering AYCE(ALL YOU CAN EAT) hotpot with only $29.98 per person.
         If you are looking for a place where you can drink and have fun with friends. Boiling hotpot is a good fit for you!
    """, address='5512 geary blvd', state='California', city='San Francisco', zip_code='94121',
                       owner_id=5, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/pjd_QmBovdQljI-oUyefIA/o.jpg')

    post5 = Restaurant(title='Sushi Maruyama', phone='650315-2945', description="""
    We are authentic sushi restaurant in San Mateo. Fish comes from TSUKIJI market ,sushi rice is
        premium short grains.tossed seaweed,original mix blend soysauce,aging ponzu and A5 wagyu.
    """, address='279 Baldwin Ave', state='California', city='San Mateo', zip_code='94401',
                       owner_id=3, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/oc-U7SuXR4leIi6OVCDzvw/o.jpg')

    post6 = Restaurant(title='Fuji Sukiyaki', phone='650348-7810', description="""
    Sushi, Nigiri, Sashimi, Rolls, Homemade Sukiyaki, Tempura! We are currently doing take-out and delivery through doordash and UberEat.
         We will open back for dine-in on June 15th 2020. Thanks for your supporting!
    """, address='428 E 3rd Ave', state='California', city='San Mateo', zip_code='94401',
                       owner_id=2, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/ELToW2WxccsawIEjyEsiyw/o.jpg')

    post7 = Restaurant(title='Espetus Churrascaria', phone='6503428700', description="""
    Churrasco (shoo - ras - ko) has been a culinary tradition for more than three centuries in Rio Grande do Sul (Southern Brazil). In the olden days, "Gauchos" (Southern Brazilian Cowboys) pierced large pieces of meat and slowly roasted them over open flamed pits, while talking about their adventures on the plains. At Espetus Churrascaria,
    we have kept the Gaucho tradition alive. Prime cuts of meat are prepared over an open flame and served as they have been for centuries, preserving the individual taste of each tender cut. In November of 2008, Espetus opened its first sister restaurant in downtown San Mateo, bringing the Peninsula the authentic Southern Brazilian "churrascaria" experience.
    """, address='710 S B st', state='California', city='San Mateo', zip_code='94401',
                       owner_id=2, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/qAP8_eFkdOcqybnaVGZmrQ/o.jpg')

    post8 = Restaurant(title='Seoul Kalbi Korean BBQ', phone='6505830702', description="""
    The Peninsula's Original Grill-At-Your-Table, All-You-Can-Eat, BBQ house, since 1991. Outdoor Patio
        Dining Now Available. Call for reservations. Also, check out our website for a special DIY KBBQ
        home grilling kit now on sale.
    """, address='1610 El Camino Real', state='California', city='San Bruno', zip_code='94066',
                       owner_id=1, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/WSfzCtLB5XLaQygFzJ6GLg/o.jpg')

    post9 = Restaurant(title='C Food Crush', phone='6506856868', description="""
    Seafood, Cajun / Creole, Californian Fusion. We are OPEN for Outdoor Dining, Takeout & Delivery. Please visit our website "www.cfoodcrush.com" to place Online Orders, make Reservations and for most up to date information. Thank you for your support!
    """, address='251 South B st', state='California', city='San Mateo', zip_code='94401',
                       owner_id=4, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/adFElqZxBj3n4NtmjdGjFg/o.jpg')

    post10 = Restaurant(title='Taishoken', phone='6504457579', description='Enjoy our signature tsukemen & ramen with house-made noodles and broth, various small plates, and great selection of sake & beer.', address='47 E 4th Ave', state='California', city='San Mateo', zip_code='94401',
                        owner_id=6, profile_pic='https://s3-media0.fl.yelpcdn.com/bphoto/rS0fd2dUKqL3kaLKDKRSTg/o.jpg')

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()


def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
