


const Place = require('../models/place');

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

  const getPlaceById = async (req, res, next)=>{
      const placeId = req.params.pid;

      let place;
      try{
        place = Place.findById(placeId)
      } catch(err){
        return next(res.status(404).json({message: 'Something went wrong, could not find a place.'}));
    }
     
    if (!place) {
      return res.status(404).json({message: 'Could not find a place for the provided id..'});
    }

    res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }

  };

  const getPlaceByUserId = async (req, res, next) => {
          let places;
        try {
          places = await Place.find({ creator: userId });
        } catch (err) {
          
          return next(res.status(404).json({message: 'Fetching places failed, please try again later'}));

        
        
        }

        if (!places || places.length === 0) {
          return next(
            res.status(404).json({message: 'Could not find places for the provided user id'})
        
          );
        }

        res.json({ places: places.map(place => place.toObject({ getters: true })) });
      };

  const createPlace = async (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        
        res.status(404).json({message: 'Invalid inputs passed, please check your data.'})
      );
    }
  
    const { title, description, address, creator } = req.body;
  
    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }
  
    // const title = req.body.title;
    const createdPlace = new Place({
      title,
      description,
      address,
      location: coordinates,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
      creator
    });
  
    try {
      await createdPlace.save();
    } catch (err) {
      const error = res.status(404).json({message: 'Creating place failed, please try again.'})
        return next(error);
    }
  
    res.status(201).json({ place: createdPlace });
  };
  
  

  const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' }); 
  };

const updatePlace = (req, res, next) =>{
  const {title, description} = req.body

  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
}

  exports.getPlaceById = getPlaceById;
  exports.getPlaceByUserId = getPlaceByUserId;
  exports.createPlace = createPlace;
  exports.deletePlace =deletePlace
  exports.updatePlace=updatePlace