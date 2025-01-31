const middleware = () => function (req, res, next) {
  let { sql, statements } = req.body

  if (!statements) {
    statements = []
  }

  if (!sql) {
    return res.status(400).json({ data: null, error: 'SQL is required' })
  }

  sql = sql.toUpperCase()

  if (sql.includes('?') && statements.length === 0) {
    return res.status(400).json({ data: null, error: 'Statements are required for this query' })
  }

  if (!sql.startsWith('SELECT')) {
    return res.status(400).json({ data: null, error: 'Only SELECT statements are allowed' })
  }

  const notAllowed = ['DELETE', 'DROP', 'TRUNCATE', 'UPDATE', 'ALTER', 'INSERT']
  if (notAllowed.some(statement => sql.includes(statement))) {
    return res.status(400).json({ data: null, error: `Statements "${notAllowed.join(', ')}" are not allowed` })
  }

  next()
}

export default middleware
