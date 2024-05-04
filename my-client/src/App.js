import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";

import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

function App() {
  // to manage cookies in the application initialize state variables `cookies`, `setCookie`, `removeCookie` using `useCookies` hook
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // from `cookies` object extract values of `AuthToken` and `User` cookies 
  // used for authentication or user identification
  const authToken = cookies.AuthToken;
  const user = cookies.User;
  // to hold array of task data fetched from an API initialize state variable `tasks` using `useState` hook
  const [tasks, setTasks] = useState([]);

  // asynchronous function to fetch task data from API
  const getData = async () => {
    try {
      // fetch to take GET request to API endpoint 
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}todos/user/${user.id}`
      );
      const res = await response.json();

      // sets the fetched tasks using the `setTasks` function
      setTasks(res.data.todos);
    } catch (error) {}
  };

  // `useEffect` hook runs when component mounts (due to empty dependency array [])
  // calls `getData` to fetch initial task data from API
  useEffect(() => {
    getData();
  }, []);

  // sort the `tasks` array by date in descending order and assigns sorted array to `sortedTasks` variable
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // JSX returning component's UI
  return (
    <div className="container" style={{ textAlign: "center" }}>
      {/* to display the toast message */}
      <ToastContainer />
      {authToken ? (
        /* if the user is authenticated, render app UI */
        <div className="app">
          <ListHeader listName="Tasks" getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </div>
      ) : (
        /* if user is not authenticated, render authentication component */
        <Auth />
      )}
      {/* copyright notice */}
      <p className="copyright">© Jenilin</p>
    </div>
  );
}

export default App;