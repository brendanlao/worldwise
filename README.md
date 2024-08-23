# Project

Worldwise - a SPA that allows users to plan out their travels and pinpoint cities that they have visited.  It was built with React as a front-end library, React Router to handle client side routing, and Leaflet, an open source tool to display an interactive map.  

## Functionality

- Interactive World Map: Users can click on any location on the map to add it to their travel log.
- City List: A list of all visited cities, which can be clicked to view personalized user details
- City Details: Each city entry includes the date of visit, a custom note, and the option to delete the entry.
   
## Limitations

- The authentication is not secure and user information is not encrypted.  This was done in order to more so focus on front-end concepts
- The back-end was mocked using JSON server, and functionality was added for HTTP requests such as GET, POST, and DELETE.  However, this does not test for scalability and performance in a real-world scenario

## Project Screen Shot(s)

### Homepage
Homepage with multiple pages including login  
<img width="500" alt="home" src="https://github.com/user-attachments/assets/710c97e7-1beb-4367-a37b-81bb6e0dc448">

### City List
List of all cities provided by the user  
<img width="500" alt="List of all cities provided by the user" src="https://github.com/user-attachments/assets/264e2538-e2c2-48a7-96c2-ae3ba65613cf">

### City Details 
Users can click on elements in the list and edit details  
<img width="500" alt="City Details" src="https://github.com/user-attachments/assets/87c9845f-857c-4721-b10d-6f734f0b89b2">

## Reflection

### Key Learning Objectives

The purpose of this project was to gain hands-on experience with important React concepts, including:

- Context API
- State management using useReducer
- Routing with React Router
- Performance optimization techniques (useCallback, memo, and lazy loading)
   
This project was adapted from Jonas Schmedtmann's React course, with additional features implemented, such as the ability to edit existing city details using PUT requests.

### Challenges

#### React Router

One of the main challenges was adapting to React Router, as my previous projects didn't involve multiple pages. Key learnings included:
- Understanding routing fundamentals (routes vs. nested routes)
- Utilizing hooks like useParams, useSearchParams, and useNavigate
- Distinguishing between routes and URL parameters/search params for state management and bookmarking
- Reading documentation to implement the modern createBrowserRouter approach instead of the older component-based Routes that the course used

#### Optimization

Another challenge was understanding techniques related to optimization with tools such as useMemo/useCallback and memo.  Key learnings included:
- Using React DevTools to pinpoint performance bottlenecks
- Understanding the differences between useMemo and useCallback and using them to prevent infinite re-renders with useEffect
- Understanding when it’s best to optimize as unnecessarily memoizing every component and value would slow down the application

#### Data Structures 

One of the functionalities included generating a list of countries from the list of cities provided in the mock API.  A problem with this is that each country must be represented only once even if multiple cities in that country are present in the list of cities.  The course had an alternative method by linearly checking all elements each time a new city was considered, which was O(n^2) complexity.  I decided to try a different implementation using a Map, which allowed for O(nlogn) complexity

Sample data from mocked API:
```JavaScript
cities: [
  {  
      "id": "4c44",
      "cityName": "Los Angeles",
      "country": "United States of America (the)",
      "emoji": "🇺🇸",
      "date": "2024-07-31T07:00:00.000Z",
      "notes": "LA!",
      "position": {
        "lat": "34.083584092797025",
        "lng": "-118.19091796875"
      }
  }
]
```

Implementation:
```JavaScript
  const countriesMap = cities.reduce((acc, curr) => {
    if (!acc.has(curr.country)) return acc.set(curr.country, curr.emoji);
    else return acc;
  }, new Map());

  const countries = Array.from(countriesMap, ([country, emoji]) => ({
    country,
    emoji,
  }));
```

In this implementation, I reduced the cities array to a map, where an element's country was added only if it wasn't already present in the list.  I decided to use a map instead of a set since each element in the countriesMap has a country name as well as emoji, and it was difficult for me to represent both of these in a set.  
In order to render this map, I converted it into an array since lists of elements to be rendered are more commonly represented as arrays.  

### Future Directions

This project has laid a solid foundation for understanding React patterns and concepts such as Context API and routing using React Router. Moving forward, I plan to:

1. Explore more advanced React topics, such as state management with Redux
2. Explore TypeScript to enhance code quality
3. Dive into component testing using React Testing Library
4. Explore full-stack concepts such as creating/consuming APIs for HTTP communication between frontend and backend
   
While this project was based on an existing course, the experience gained in understanding best practices related to optimization, side effects, and routing
 will be invaluable for future projects.
