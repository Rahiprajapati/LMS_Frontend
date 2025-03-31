import axios from 'axios';
import React, { createContext, useState } from 'react';
const UserContext = createContext();
const Authprovider = ({children}) => {                   //main function
    const [user, setuser] = useState(null)                 //hook

    const register=async( name, email, password)=>{                  //function
        try{
            const res =await axios.post("http://localhost:3001/register",{ name, email, password})
            setuser(res.data.user)
        }
        catch(error){
            console.log(error)
        }
    }



    const login = async (email, password) => {    
        try {
            const res = await axios.post("http://localhost:3001/login", { email, password });
            setuser(res.data.user);
            return res.data.user;  // Return user data for redirection
        } catch (error) {
            console.log(error);
            return null;  // Return null if login fails
        }
    };
    

    // const addcourse=async(title,description,createdBy,duration,price)=>{
    //     try{
    //         const res =await axios.post("http://localhost:3001/addcourse",{title,description,createdBy,duration,price})
    //         setuser(res.data.user)
    //         console.log("Course Added:", res.data); 
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }


    const addcourse = async(title, description, createdBy, duration, price) => {
        try {
            const res = await axios.post("http://localhost:3001/addcourse", {
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

    
    const getcourse = async () => {
        try {
            const res = await axios.get("http://localhost:3001/getcourse");
            console.log("Fetched Courses:", res.data.courses); 
            return res.data.courses; 
        } catch (error) {
            console.log("Error fetching courses:", error);
            return []; 
        }
    };
    
//     const deletecourse=async(id)=>{
//         try{
//             const res = await axios.delete(`http://localhost:3001/deletecourse/${id}`);
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
        const res = await axios.delete(`http://localhost:3001/deletecourse/${id}`, {
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
    //         const res = await axios.put(`http://localhost:3001/updatecourse/${id}`, {
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
            const res = await axios.put(`http://localhost:3001/updatecourse/${id}`, {
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
    
    
    return (
        <div>
            <UserContext.Provider value={{user,register,login,addcourse,getcourse,deletecourse,updatecourse}}>
            {children}
            </UserContext.Provider>
        </div>
    )
}



export default Authprovider
export { UserContext };


// AXIOS :--> crud or http request use axios  axios fetch the api from backend
// CHILDREN :--> All sub-files are consumer 

