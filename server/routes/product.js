import express from 'express';
import Product from '../models/products';
import util from 'util';
import bookshelf from '../bookshelf';

let router = express.Router();

router.post('/addProduct', (req, res) => {
    const data = req.body.data;
    const user_id = req.body.user_id;
    
    const { product_name, product_desc, product_link, product_media } = data;

    Product.forge({product_name, product_description: product_desc, product_link, product_media, maker_id: user_id}, { hasTimestamps: false })
        .save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ errors: err }))
});

router.get('/getProductList', (req, res) => {

  let offset         = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  let item_per_page  = req.query.limit  ? parseInt(req.query.limit, 10) : 10;
  let nextOffset     = offset + item_per_page;
  let previousOffset = (offset - item_per_page < 1) ? 0 : offset - item_per_page;
  var total_count   = 0 ;

  Product.count('id').then((count) => total_count = count);

  Product.forge().orderBy('upvote','DESC').fetchPage({
        limit: item_per_page, // Defaults to 10 if not specified
        offset: offset // Defaults to 1 if not specified
    }).then(product => {
        var meta = {
            limit           : item_per_page,
            next            : util.format('?limit=%s&offset=%s', item_per_page, nextOffset),
            currentoffset   : req.query.offset,
            previous        : util.format('?limit=%s&offset=%s', item_per_page, previousOffset),
            total_count     : parseInt(total_count,10)
        };
        return res.json({ product, meta });
    });
});


router.put('/addVote', (req, res) => {
    const pid = req.body.pid;

    Product.query().where('id',pid).increment('upvote',1)
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ errors: err }))
});

export default router;