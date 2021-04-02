class QueryBuilder:
  query = {}

  def _(self, filter, value, multiple=False):
    if value != None and value != '':
      if multiple:
        self.query[filter] = value.split(',')
      else:
        self.query[filter] = value
    return self
  
  def build(self):
    return self.query

def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None