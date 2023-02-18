import {Router} from 'express';
import { getUsuarios, getUsuario, postUsuario, deleteUsuario, putUsuario , login} from '../controllers/usuarios';
import { getTareas} from '../controllers/tareas';

const router = Router();

//rutas de usuarios
router.get('/',getUsuarios)
router.get('/:id',getUsuario)
router.post('/',postUsuario)
router.put('/:id',putUsuario)
router.delete('/:id',deleteUsuario)
router.post('/login',login)

//Rutas de Tareas
router.get('/',getTareas)

export default router