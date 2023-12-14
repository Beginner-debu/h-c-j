function getPromises(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('the data was found successfully');
    }, 100);
  });
}

function manipulateResolve(data){
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve(`${data} another data was found `);
    }, 100);
  });
}




getPromises()
  .then(manipulateResolve);