module.exports = (app) =>{
    const express = require('express');
    const express_graphql = require('express-graphql');
    const {buildSchema} = require('graphql')
    
    const {courses} =require('./data.json');
    const schema = buildSchema(`
    type Query{
        course(id: Int!): course
        courses(topic: String):[course]
    }

    type Mutation{
        updateCourse(id: Int!, topic: String!): course
    }

    type course{
        id: Int
        title: String
        author: String
        topic: String
        url: String
    }

    `);
     let getCourse = (args) =>{
        let id = args.id;
        return courses.filter(course => {
            return course.id == id;
        })[0]
     }

     let getCourses = (args) =>{
         if (args.topic){
             let topic = args.topic;
             return courses.filter(course => course.topic === topic);
         }else{
             return courses;
         }
        }
        let updateCourse =({id, topic}) =>{
            courses.map(course =>{
                if(course.id === id){
                    course.topic = topic;
                    return course;
                }
            })
            return courses.filter(course => course.id === id)[0];
        }
    const root = {
         course: getCourse,
         courses: getCourses,
         updateCourse:updateCourse

        
    }
    app.use('/graphql', express_graphql({
        schema,
        rootValue: root,
        graphiql:true
    }));


}