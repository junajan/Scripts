var superagent = require('superagent'),
    xml2js = require('xml2js');

var collections = ["companies", "categories", "quotes"]
var mongojs = require('mongojs'),
dburl = process.env.MONGOHQ_URL || 'mongodb://localhost/stock',
db = mongojs(dburl, collections);

function getCompanyItems ( items ) {
    
      for (key in items.company) {
          
          
          items.company[key].cat = items.id
          inDB = items.company[key];
          
          console.log ( inDB )
          
        item = db.companies.find( inDB ).limit(1);
        if ( item.length ) {

            console.log ( "Find result" );
            console.log ( item );

        } else if ( ! item.length ) {

            console.log( "Importing .. " + inDB.name);

            db.companies.insert(inDB, {safe:true}, function(err, docs){
                   console.log('err: ' + err);
                   if(!err) console.log('data inserted successfully!\n');

               });
        } else 
            console.log("Company was found");

      }
    
}


function getCompanyJson ( data ) {
    

    for (key in data) {

//        console.log( data[key].name);
//        console.log( data[key].id);
        
           inDB = {  
            name: data[key].name, 
            id: data[key].id
            };
            
            console.log( "Testing .. " + inDB.name);
            
            item = db.categories.find( inDB ).limit(1);
            
            
            if ( item.length ) {
                
                console.log ( "Find result" );
                console.log ( item );

            } else if ( ! item.length ) {

                console.log( "Importing .. " + inDB.name);
                
                db.categories.insert(inDB, {safe:true}, function(err, docs){
                       console.log('err: ' + err);
                       if(!err) console.log('data inserted successfully!\n');
                       
                   });
            } else 
                console.log("Cat was found");
            
            
            getCompanyItems ( data[key] )

//        importQuot ( symbols[key] );
//        break;
    }
}

function getCompanyList( url ) {
 
        superagent.get( url )
           .set({  Accept: 'application/json' })
           .end(function(e, res){
             if (e) next(e);
             
             if ( typeof res.res.body.query.results === "undefined" ) 
                 console.log ( "BAD IMPORT DATA" )
             else {
                 
                 res = res.res.body.query.results.industry;
                 getCompanyJson ( res );
             }
             
//             list = res.res.body.query.results;
//             console.log(list);
//                process.exit(1)
           });
//
//    list = { 0: {name:"aa", id: 1}, 1: {name: "bb", id: 2}}
//    getCompanyJson ( list );

}

// Functions which will be available to external callers
exports.getCompanyList = getCompanyList;
