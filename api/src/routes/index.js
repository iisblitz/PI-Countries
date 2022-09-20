const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async() => {
    try {
        const apiUrl = await axios.get("https://restcountries.com/v3/all")
        const apiInfo = await apiUrl.data.map(el => {
                return {
                
                    id: el.cca3,
                name: el.name.common,
                img: el.flags[1],
                continents: el.continents[0],
                capital : ( el.capital || []).length === 0 ? "No tiene capital" : el.capital[0] ,
                subregion: el.subregion,     
                area: el.area,
                population: el.population,
                borders: el.borders? el.borders.map(border=> {return border}) : "No tiene capital",
                fifa: el.fifa
                
            };
    }); 
    
        return apiInfo;  
    }
    catch (error) {
        res.status(404).send('Error');  
    }
}
const getDbInfo = async () => {
    return await Countries.findAll({
      includes: Activities,
        
        // attributes: ['name', 'dificultad', 'duracion', 'temporada',],   
        // through: { activities: [] } // Mediante

             
    })
} 

const getAllCountries = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
       return infoTotal;
}




router.get('/countries/:id', async (req, res)=>{
    const id = req.params.id; // const {id} = req.params
    let countriesTotal = await getAllCountries();
    
    if (id) {
        let countriesId = await countriesTotal.filter ( el => el.id.toLowerCase()===(id.toLowerCase()))
        countriesId.length ?
        res.status(200).json(countriesId) :
        res.status(404).send('No existe ese Pais');

    }
    
}) 



router.get('/countries', async (req, res)=> { //query
    let allCountries = await Countries.findAll({include:Activities});//consulta la base de datos
    const id = req.query.id; // peticion 
    const name = req.query.name;   

    if(!allCountries.length){ 
        allCountries = await getApiInfo();
        await Countries.bulkCreate(allCountries);
    }
    if (id) {
        let countriesId = allCountries.filter( el => el.id.toLowerCase()===id.toLowerCase())
        return countriesId.length ?
        res.status(200).send(countriesId) :
        res.status(404).send('No existe ese Pais');
    }
    if (name) {
        let countriesName = allCountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        return countriesName.length ?
        res.status(200).send(countriesName) :
        res.status(404).send('No existe ese Pais');
    }
        return res.status(200).json(allCountries)
  
})

router.delete('/countries',async(req,res)=>{
    let delCountry = req.query.id
    let response = allCountries.filter(!delCountry)
    return response != allCountries?
    res.status(200).send(response):
    res.status(400).send(error)
})


router.post('/activities', async (req, res) =>{
    const {
        name,
        dificultad,
        duracion,
        temporada,
        countriesId
    } = req.body

    if(!name || !dificultad || !duracion || !temporada|| !countriesId){
        return res.status(404).send("Algunos campos necesitan ser llenados");
      }
      try {
          
          const activitiesCreated = await Activities.create ({
              name,
              dificultad,
              duracion,
              temporada,
              
            })
            
              
        for (let i = 0; i < countriesId.length; i++) {
            await activitiesCreated.addCountries(countriesId[i].id);       
        }
        return res.status(200).json(activitiesCreated)      
      } catch (error) {
        res.send(error);
      }
});

router.put('/activities', async (req, res) =>{
    const {
        name,
        dificultad,
        duracion,
        temporada,
        countriesId
    } = req.body

    if(!name || !dificultad || !duracion || !temporada|| !countriesId){
        return res.status(404).send("Algunos campos necesitan ser llenados");
      }
      try {
          
          const activitiesEdited = await ActivitiesEdit ({
              name,
              dificultad,
              duracion,
              temporada,
              
            })
            
              
        for (let i = 0; i < countriesId.length; i++) {
            await activitiesEdited.editCountries(countriesId[i].id);       
        }
        return res.status(200).json(activitiesEdited)      
      } catch (error) {
        res.send(error);
      }
});

router.delete('/activities', async (req, res) =>{
    const {
        name,
        } = req.body

      try {
          
          const activitiesDeleted = await Activities.delete ({
              name,
            })
            
              
        for (let i = 0; i < countriesId.length; i++) {
            await activitiesDeleted.removeCountries(countriesId[i].id);       
        }
        return res.status(200).json(activitiesDeleted)      
      } catch (error) {
        res.send(error);
      }
});


router.get('/activities', async (req, res) => {

    const activities = await Activities.findAll();
    if(activities.length) {
      return res.status(200).json(activities);
    }
    return res.status(200).send([]);


});
module.exports = router;
