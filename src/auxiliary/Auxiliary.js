export function formatTimestamp(ts) {
  var date = new Date(ts * 1000)

  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = "2021"
  var hours = date.getHours()
  var minutes = "0" + date.getMinutes()

  var formattedTime = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes.substr(-2)

  return formattedTime
}