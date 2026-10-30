class Workout < ApplicationRecord
  belongs_to :user

  has_many :workout_exercises, dependent: :destroy

  validates :date, presence: true, uniqueness: { scope: :user_id }

  validates :memo, length: { maximum: 1000 }

  scope :recent, -> { order(date: :desc, id: :desc) }

  def safe_attributes
    { id: id, date: date, memo: memo }
  end
end
