import {Router} from 'express';
import { getTareas, getTarea, postTarea, putTarea, deleteTarea } from '../controllers/tareas';
import  validarJWT  from '../middleware/validar-jwt';

const router = Router();

//Rutas de Tareas
router.get('/',[validarJWT],getTareas)
router.get('/:id',[validarJWT],getTarea)
router.post('/',[validarJWT],postTarea)
router.put('/:id',[validarJWT],putTarea)
router.delete('/:id',[validarJWT],deleteTarea)

export default router