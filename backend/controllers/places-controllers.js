let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
  ];

  const getPlaceById = (req, res, next)=>{
      const placeId = req.params.pid;

      const places = DUMMY_PLACES.find(p => {
          return p.id === placeId
      })
      if(!places){
          return res.status(404).json({message: 'could not find place for provided user'});
      }
      res.json({places})
  }

  exports.getPlaceById = getPlaceById;