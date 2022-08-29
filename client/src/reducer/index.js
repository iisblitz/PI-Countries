const initialState = {
    countries: [],
    allCountries: [],
    activities : []
    
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'GET_NAME_COUNTRIES':
            return{
                ...state,
                countries: action.payload
            }

        

            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc'?
                    state.countries.sort(function(a,b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.countries.sort(function(a,b){
                        if(a.name > b.name){
                            return - 1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    })

                return {
                    ...state,
                    countries: sortedArr
                }

                case 'ORDER_BY_POPULATION':
                    let populationOrder = action.payload === 'asc'?
                        state.countries.sort(function(a,b){
                            if(a.population > b.population){
                                return 1;
                            }
                            if(b.population > a.population){
                                return -1;
                            }
                            return 0;
                        }) :
                        state.countries.sort(function(a,b){
                            if(a.population > b.population){
                                return - 1;
                            }
                            if(b.population > a.population){
                                return 1;
                            }
                            return 0;
                        })
    
                    return {
                        ...state,
                        countries: populationOrder
                    }
    


                
            case "POST_COUNTRIES":
                return {
                    ...state,
                }

            case 'GET_ACTIVITIES':
                                
                return {
                    ...state,
                    activities: action.payload
                }

                case 'ADD_ACTIVITIES':
                    return {
                        ...state,
                        activities: [...state.activities, action.payload]
                    }

            case 'REMOVE_ACTIVITIES':
                    return{
                        ...state,
                        activities:[...state.activities, action.payload]
                    }

            case 'EDIT_ACTIVITIES':
                    return{
                        ...state,
                        activities:[...state.activities, action.payload]
                        }                    


            case 'FILTER_BY_REGION':
                const allCountries = state.allCountries
                const regionFilter = action.payload === 'All'? allCountries : allCountries.filter(el => el.continents === action.payload)
                return{
                    ...state,
                    countries: regionFilter
                }
           

            case 'FILTER_CREATED':
                let filter = action.payload === 'sin filtro'?state.allCountries : state.allCountries.filter((country)=>{
                    const activities= country.activities.map((a)=>a.name)
                    return activities.includes(action.payload)
                })
                                      
                return {
                    ...state,
                    countries: filter
                }

            case "GET_DETAILS":
                return{
                    ...state,
                    detail: action.payload 
                }

            default: 
            return state;
    }
}
export default rootReducer;