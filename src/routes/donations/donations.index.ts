import * as Routes from './donations.routes.ts';
import * as Handlers from './donations.handlers.ts';
import { createRouter } from '../../lib/create-app.ts';

const router = createRouter().
    openapi(Routes.create, Handlers.create).
    openapi(Routes.get, Handlers.get);

export default router;