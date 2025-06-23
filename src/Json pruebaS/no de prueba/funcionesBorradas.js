const createAndOrAssociateOneTag = async (req, res) => {
    const id = req.params.id;
    let tag = await Tag.findOne({where:{nombre:req.body.nombre}});
    const existingPost = await post.findOne({where:{id}});
    if(tag) {
        await tag.addPost(existingPost);
    }
    else {
        tag = await existingPost.createTag(req.body);
    }
    res.status(201).json(tag);
};

const createAssociateOneImage = async (req, res) => {
    const id = req.params.id;
    const newImage = await post_image.create({...req.body, postId:id});
    res.status(201).json(newImage);
};

//const userImagesMap = userImagesFlatMap.map(i => i.url); //puede servir para obtener un array de strings urls