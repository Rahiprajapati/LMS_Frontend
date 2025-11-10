import { createContext, useState } from 'react';
import api from './api';
const UserContext = createContext();
const Authprovider = ({children}) => {                   //main function
    const [user, setuser] = useState(null)                 //hook
    const [purchasedCourses, setPurchasedCourses] = useState([])

    const register = async( name, email, password) => {                  //function
        try{
            const res =await axios.post("https://my-project-chi-eosin.vercel.app/register",{ name, email, password})
            setuser(res.data.user)
        }
        catch(error){
            console.log(error);
            return null;
        }
    }



    const login = async (email, password) => {    
        try {
            const res = await axios.post("https://my-project-chi-eosin.vercel.app/login", { email, password });
            setuser(res.data.user);
            setPurchasedCourses(res.data.user.purchasedCourses || []);
            return res.data.user;  // Return user data for redirection
        } catch (error) {
            console.log(error);
            return null;  // Return null if login fails
        }
    };
    

    // const addcourse=async(title,description,createdBy,duration,price)=>{
    //     try{
    //         const res =await axios.post("https://my-project-chi-eosin.vercel.app/api/addcourse",{title,description,createdBy,duration,price})
    //         setuser(res.data.user)
    //         console.log("Course Added:", res.data); 
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }


    const addcourse = async(title, description, createdBy, duration, price) => {
        try {
            const res = await axios.post("https://my-project-chi-eosin.vercel.app/addcourse", {
                role: user.role,  // Include the user's role
                title,
                description,
                createdBy,
                duration,
                price
            });
            console.log("Course Added:", res.data);
            return res.data;
        }
        catch(error) {
            console.log(error);
            return null;
        }
    }

    // Add lecture (persisted) - admin only
    const addLecture = async (courseId, title, url) => {
        try {
            const res = await api.post(`/course/${courseId}/lecture`, { role: user?.role, title, url });
            console.log('Lecture added', res.data);
            return res.data;
        } catch (err) {
            console.log('Add lecture error', err);
            return null;
        }
    }

    
    const getcourse = async () => {
        try {
            const res = await axios.get("https://my-project-chi-eosin.vercel.app/getcourse");
            console.log("Fetched Courses:", res.data.courses); 
            return res.data.courses; 
        } catch (error) {
            console.log("Error fetching courses:", error);
            return []; 
        }
    };
    
//     const deletecourse=async(id)=>{
//         try{
//             const res = await axios.delete(`https://my-project-chi-eosin.vercel.app/api/deletecourse/${id}`);
// console.log("Course Deleted:", res.data);

//             setuser(res.data.user)
//             console.log("Course Deleted:", res.data); 
//         }
//         catch(error){
//             console.log(error)
//         }
//     }

const deletecourse = async(id) => {
    try {
        // Include the user's role in the request
        const res = await axios.delete(`https://my-project-chi-eosin.vercel.app/deletecourse/${id}`, {
            data: { role: user.role }  // Send role in request body for DELETE request
        });
        console.log("Course Deleted:", res.data);
        return res.data;
    }
    catch(error) {
        console.log("Delete error:", error);
        return null;
    }
}


    // const updatecourse=async(id,title,description,createdBy,duration,price)=>{
    //     try{
    //         const res = await axios.put(`https://my-project-chi-eosin.vercel.app/updatecourse/api/${id}`, {
    //             title, description, createdBy, duration, price
    //         });
    //         console.log("Course Updated:", res.data);
            
    //         setuser(res.data.user)
    //         console.log("Course Updated:", res.data);
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    const updatecourse = async(id, title, description, createdBy, duration, price) => {
        try {
            const res = await axios.put(`https://my-project-chi-eosin.vercel.app/updatecourse/${id}`, {
                role: user.role,
                title, 
                description, 
                createdBy, 
                duration, 
                price
            });

            console.log("Course Updated:", res.data);
            return res.data;
        }
        catch(error) {
            console.log("Update error:", error);
            return null;
        }
    }

    // Simple client-side logout. If you have a server logout endpoint, call it here.
    const logout = () => {
        setuser(null);
        return true;
    }

    // Purchase a course (persist to backend)
    const purchaseCourse = async (courseId) => {
        try {
            if (!user) return false;
            const res = await api.post('/purchase', { userId: user._id, courseId });
            if (res.data && res.data.user) {
                // Update local user and purchasedCourses
                setuser(res.data.user);
                setPurchasedCourses(res.data.user.purchasedCourses || []);
                return true;
            }
            return false;
        } catch (err) {
            console.log('Purchase error', err);
            return false;
        }
    }

    const isCoursePurchased = (courseId) => {
        return purchasedCourses.includes(courseId);
    }
    
    
    return (
        <div>
            <UserContext.Provider value={{user,register,login,logout,addcourse,getcourse,deletecourse,updatecourse,addLecture,purchaseCourse,isCoursePurchased,purchasedCourses}}>
            {children}
            </UserContext.Provider>
        </div>
    )
}



export default Authprovider
export { UserContext };


// AXIOS :--> crud or http request use axios  axios fetch the api from backend
// CHILDREN :--> All sub-files are consumer 

