from .models import Notification

base_link = {
  'log': '/log/{}',
  'assignment': '/penilaian'
}

'''
PERLU DISKUSI
'''
class NotifService:

  @staticmethod
  def logApprovedNotif(log):
    Notification.objects.create(
      user = log.user,
      text = "Log Aktivitas anda telah disetujui",
      link = base_link['log'].format(log.id)
    )

  @staticmethod
  def logRejectedNotif(log):
    Notification.objects.create(
      user = log.user,
      text = "Log Aktivitas anda telah ditolak",
      link = base_link['log'].format(log.id)
    )

  @staticmethod
  def newAssignmentNotif(log):
    Notification.objects.create(
      user = log.user,
      text = "Log Aktivitas anda telah disetujui",
      link = base_link['log'].format(log.id)
    )