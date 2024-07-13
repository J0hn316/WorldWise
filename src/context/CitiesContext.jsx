import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:3001';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        // after current city is create set it to active
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  // Using UseState
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  // Using useReducer
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        //setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        // setCities(data);
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        // alert('There was an error loading data...');
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }
    fetchCities();
  }, []);

  // Similar to a Get route for backend
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      //setCurrentCity(data);
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      // alert('There was an error loading data...');
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city...',
      });
    }
  }

  // Similar to a Post route for backend
  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      // setCities((cities) => [...cities, data]);
      dispatch({ type: 'city/created', payload: data });
    } catch {
      // alert('There was an error creating city');
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city.',
      });
    }
  }
  // Similar to a Delete route for backend
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      //alert('There was an error deleting city');
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('useCities must be used within a CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
