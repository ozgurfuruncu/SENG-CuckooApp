import enum


class Role(str, enum.Enum):
    EMPLOYER = "EMPLOYER"   # işveren
    WORKER = "WORKER"       # işi kabul eden
    ADMIN = "ADMIN"         # yönetici (Could)


class Category(str, enum.Enum):
    CAR_INSPECTION = "CAR_INSPECTION"   # araç ekspertizi
    DOG_WALKING = "DOG_WALKING"         # köpek gezdirme
    GARDEN_CARE = "GARDEN_CARE"         # bahçe bakımı


class JobStatus(str, enum.Enum):
    OPEN = "OPEN"                       # Açık
    ACCEPTED = "ACCEPTED"               # Kabul edildi
    PROOF_UPLOADED = "PROOF_UPLOADED"   # Kanıt yüklendi
    COMPLETED = "COMPLETED"             # Tamamlandı
    RATED = "RATED"                     # Puanlandı
    CLOSED = "CLOSED"                   # İşveren tarafından kapatıldı
