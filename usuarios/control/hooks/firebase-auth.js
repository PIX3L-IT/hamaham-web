const admin = require('../../../config/firebase');
const { NotAuthenticated } = require('@feathersjs/errors');
const cookie = require('cookie');

async function firebaseAuthHook(context) {
    if (context.path == 'api/users'){
        
        const headers = context.params.headers || {};
    
        // 1. Revisa si hay cookie
        let sessionCookie;
        if (headers.cookie) {
            const parsedCookies = cookie.parse(headers.cookie);
            sessionCookie = parsedCookies.session;
        }
    
        // 2. Revisa si hay Authorization
        let idToken;
        if (headers.authorization) {
            // "Authorization: Bearer <token>"
            idToken = headers.authorization.split(' ')[1];
        }
    
        // Si no hay ni cookie ni header, rechaza
        if (!sessionCookie && !idToken) {
            throw new NotAuthenticated('No session cookie or Authorization token provided');
        }
    
        // 3. Intentar validar la Session Cookie primero (si existe)
        if (sessionCookie) {
            try {
            const decodedCookie = await admin.auth().verifySessionCookie(sessionCookie, true);
            context.params.firebaseUser = { uid: decodedCookie.uid };
            return context; 
            } catch (error) {
            // Session Cookie inválida o expirada, probamos el ID token si existe
            if (!idToken) {
                // Si no hay token, lanzamos error
                throw new NotAuthenticated('Invalid or expired session cookie');
            }
            }
        }
    
        // 4. Si no validamos la cookie o falló, probamos con el ID token (si existe)
        if (idToken) {
            try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            context.params.firebaseUser = { uid: decodedToken.uid };
            return context;
            } catch (error) {
            throw new NotAuthenticated('Invalid or expired ID token');
            }
        }
    
        // Si llegamos hasta aquí, algo salió mal (por ejemplo, cookie inválida y no hay ID token)
        throw new NotAuthenticated('Authentication failed');
    } else {
        return context;
    }
}


module.exports = firebaseAuthHook 
