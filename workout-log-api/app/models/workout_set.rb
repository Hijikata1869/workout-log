class WorkoutSet < ApplicationRecord
  belongs_to :workout_exercise

  validates :weight, numericality: { greater_than_or_equal_to: 0, less_than: 1000, allow_nil: true }
  validates :reps, numericality: { only_integer: true, greater_than: 0, allow_nil: true }
  validates :interval_seconds, numericality: { only_integer: true, greater_than_or_equal_to: 0, allow_nil: true }

  scope :ordered, -> { order(created_at: :asc, id: :asc) }

  def safe_attributes
    { id: id, weight: weight, reps: reps, interval_seconds: interval_seconds }
  end
end
