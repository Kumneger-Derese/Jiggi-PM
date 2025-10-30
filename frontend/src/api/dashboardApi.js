import Axios from '../utils/axiosInstance.js'

const getDashboardData = async () => {
  const { data } = await Axios.get('/dashboard/data')
  return data
}

const changeRole = async payload => {
  const { data } = await Axios.put(`/dashboard/change-role`, payload)
  return data
}

const removeTeamMember = async payload => {
  const { memberId, projectId } = payload
  const { data } = await Axios.delete(
    `/dashboard/remove-member/${projectId}/${memberId}`
  )
  return data
}
export { getDashboardData, changeRole, removeTeamMember }
