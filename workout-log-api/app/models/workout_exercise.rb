class WorkoutExercise < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise

  validates :exercise_id, uniqueness: { scope: :workout_id }

  validates :memo, length: { maximum: 1000 }
end
