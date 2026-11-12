class Workout < ApplicationRecord
  belongs_to :user

  has_many :workout_exercises, -> { order(created_at: :asc, id: :asc) },  dependent: :destroy

  validates :date, presence: true, uniqueness: { scope: :user_id }

  validates :memo, length: { maximum: 1000 }

  scope :recent, -> { order(date: :desc, id: :desc) }

  def safe_attributes
    { id: id, date: date, memo: memo }
  end

  def detail_attributes
    exercises_json = workout_exercises.includes(:exercise, :workout_sets).map { |we| we.safe_attributes }
    { id: id, date: date, memo: memo, exercises: exercises_json }
  end
end
