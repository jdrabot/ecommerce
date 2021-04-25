const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: [ "id", "price", "product_name", "stock", "category_id" ],
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
      includes: [
        {
          model: Product,
          attributes: [ "id", "price", "product_name", "stock", "category_id" ],
        },
      ],
    });
    if (!oneCategory) {
      res.status(404).json({ message: "No category associated with that id!" });
      return;
    }
    res.status(200).json(oneCategory);

  } catch (err) {
    res.json(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    if (!createCategory) {
      res.status(404).json({ message: "New category not created!" });
      return;
    }
    res.status(200).json(createCategory);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory) {
      res.status(404).json({ message: "Category not updated!" });
      return;
    }
    res.status(200).json(updateCategory)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "no category to be deleted!" });
      return;
    }
    res.status(200).json(deleteCategory)

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
