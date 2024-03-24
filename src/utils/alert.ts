import swal from 'sweetalert'

type AlertType = 'warning' | 'error' | 'success' | 'info'

interface Params {
  title?: string
  message: string
  icon: AlertType
}

export const alert = (params: Params) => {
  return swal({
    title: params.title,
    text: params.message,
    icon: params.icon
  })
}
