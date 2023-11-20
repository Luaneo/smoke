import requests


token = 'APP_TOKEN'


def get_group_data(field: str, value: str):
  """
  ! Internal function: better use get_one_group_data or get_many_group_data.
  Makes request to VK API and returns group(s)' data.
  @param field: 'group_id' or 'group_ids'
  @param value: group_id or group_ids
  """
  response = requests.get('https://api.vk.com/method/groups.getById', params={
    field: value,
    'access_token': token,
    'v': '5.154',
    'fields': 'activity,ban_info,can_post,can_see_all_posts,city,contacts,counters,country,cover,description,finish_date,fixed_post,links,market,members_count,place,site,start_date,status,trending,verified,wall'
    })

  return response.json()

def get_one_group_data(group_id: str):
  """
  Returns one group's data using VK API.
  """
  return get_group_data('group_id', group_id)

def get_many_group_data(group_ids: str):
  """
  Returns many groups' data using VK API.
  """
  return get_group_data('group_ids', group_ids)
