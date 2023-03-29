const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  });
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    includes: [
      {
        model: Product,
        through: ProductTag,
        as: `product_tag`,
      },
    ],
  });
  res.json(tagData);
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((tag) => {
    res.json(tag);
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((tag) => {
    res.json(tag);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});
    

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
