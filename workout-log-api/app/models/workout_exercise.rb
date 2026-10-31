class WorkoutExercise < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise

  has_many :workout_sets, dependent: :destroy

  validates :exercise_id, uniqueness: { scope: :workout_id }

  validates :memo, length: { maximum: 1000 }
end
