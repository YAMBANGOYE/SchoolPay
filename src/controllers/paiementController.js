

exports.index = async(req, res) => {
     try {
           
            res.render('paiement/show', {
                InscriptionsActive: 'active'
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};