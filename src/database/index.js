import Loki from 'lokijs'

export const db = new Loki('notes',{
    autoload:true,
    autoloadCallback:databaseInitialize,
    autosave:true,
    autosaveInterval:3000,
    persistenceMethod:'localStorage'
})

function databaseInitialize(){
    //获取notes集合
    const notes = db.getCollection('notes')
    if(notes === null ){
        //等于null ，添加一个notes集合
        db.addCollection('notes')
    }
}

export function loadCollection(collection){
    return new Promise(resolve=>{
        db.loadDatabase({},()=>{
            const _collection = db.getCollection(collection)|| db.addCollection(collection)
            resolve(_collection)
        })
    })
}