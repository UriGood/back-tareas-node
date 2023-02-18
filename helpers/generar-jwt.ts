import jwt  from 'jsonwebtoken';
// import  {jwt} from 'jsonwebtoken';


const generarjwt = (uid = '') => {

    return new Promise((resolve, reject)=>{
        const payload = {uid};

        // jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY as string, {
            expiresIn:'4h'
        }, (err:any, token:any)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    });

}

export default generarjwt;