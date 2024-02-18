import express from 'express';
//init prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

var router = express.Router();

/**
 * @openapi
 * /api_rest/artists:
 *   get:
 *     description: Liste des artistes
 *     tags: [artiste]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/* GET lists artistes. */
router.get('/artists', async (req, res, next) => {

    //récupération de tout les artistes
    const allArtiste = await prisma.artiste.findMany()
    //retour json
    res.json({ artiste: allArtiste });
});

/**
 * @openapi
 * /api_rest/styles:
 *   get:
 *     description: Liste des styles
 *     tags: [style]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/* GET lists styles. */
router.get('/styles', async (req, res, next) => {

    //récupération de tout les artistes
    const allStyle = await prisma.style.findMany()
    //retour json
    res.json({ artiste: allStyle });
});

/**
 * @openapi
 * /api_rest/artists:
 *   post:
 *     description: Créer un artiste
 *     tags: [artiste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *               idStyle:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               message: created
 *       400:
 *         description: not created
 *         content:
 *           application/json:
 *             example:
 *               message: Data send, not complet
 * 
 */


/* POST create artists. */
router.post('/artists', async (req, res, next) => {
    var body = req.body

    //verification si les info demandé son bien envoyer
    if (body.pseudo != undefined && body.idStyle != undefined) {
        try {
            let newArtist = await prisma.artiste.create({
                data: {
                    pseudo: body.pseudo,
                    idStyle: body.idStyle
                },
            });
            //retour json
            res.status(201).json({ message: "created", artist: newArtist });
        }
        catch (error) {
            //retour json
            res.status(500).json({ message: error });
        }
    } else {
        //retour json
        res.status(400).json({ message: "Data send, not complet" });
    }
});

/**
 * @openapi
 * /api_rest/artists:
 *   patch:
 *     description: Met à jour les informations d'un artists
 *     tags: [artiste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idArtiste:
 *                 type: integer
 *               pseudo:
 *                 type: string
 *               idStyle:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               message: updated
 *       400:
 *         description: not updated
 *         content:
 *           application/json:
 *             example:
 *               message: Data send, not complet
 */
/* PATCH update artists. */
router.patch('/artists', async (req, res, next) => {
    var body = req.body

    //verification si les info demandé son bien envoyer
    if (body.idArtiste != undefined && body.pseudo != undefined && body.idStyle != undefined) {
        try {
            const updateArtiste = await prisma.artiste.update({
                where: {
                    IdArtiste: Number(body.idArtiste),
                },
                data: {
                    pseudo: body.pseudo,
                    idStyle: body.idStyle()
                },
            })
            //retour json
            res.status(200).json({ message: "updated", artiste: updateArtiste });
        }
        catch (error) {
            //retour json
            res.status(500).json({ message: error });
        }
    } else {
        //retour json
        res.status(400).json({ message: "Data send not complet" });
    }
});

/**
 * @openapi
 * /api_rest/artists/{id}:
 *   delete:
 *     description: Supprime un artiste
 *     tags: [artiste]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'id de l'artiste
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *           application/json:
 *             example:
 *               message: "deleted"
 */
/* DELETE artiste. */
router.delete('/artists/:id', async (req, res, next) => {
    var artiste_id = Number(req.params.id);
    //verification si les info demandé son bien envoyer

    try {
        const deleteArtiste = await prisma.artiste.delete({
            where: {
                IdArtiste: artiste_id,
            },
        })
        //retour json
        res.status(200).json({ message: "deleted", artiste: deleteArtiste });
    }
    catch (error) {
        //retour json
        res.status(500).json({ message: error });
    }
});

/**
 * @openapi
 * /api_rest/artists/{id}:
 *   get:
 *     description: Récupére les informations d'un artists
 *     tags: [artiste]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'id de l'artiste
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 */
/* GET info artistes. */
router.get('/artists/:id', async (req, res, next) => {
    let id_artiste = Number(req.params.id);

    try {
        //récupération de tout les artistes
        const artiste = await prisma.artiste.findUnique({
            where: {
                IdArtiste: id_artiste,
            }
        })
        //retour json
        res.json({ artiste: artiste });
    } catch (error) {
        //retour json
        res.status(500).json({ message: error });
    }

});

export { router as apiRestRouter };