function getUserGamesColumns(userDb){
    
    return new Promise((resolve, reject)=>{

         const query = `PRAGMA table_info(games);`;
        userDb.all(query, (err, rows) => {
        if (err) {
            console.error('Error running query:', err);
            userDb.close();
            return reject(err);
        }
        const columns = rows.map(row => row.name);
        let questionMarks = columns.map(()=>"?").join(",");
        let joinedColumns = columns.join(",");
        resolve({joinedColumns, questionMarks});
        });
    })
   
}

module.exports = getUserGamesColumns;