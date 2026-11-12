class WorkoutExercise < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise

  has_many :workout_sets, -> { order(created_at: :asc, id: :asc) }, dependent: :destroy

  validates :exercise_id, uniqueness: { scope: :workout_id }

  validates :memo, length: { maximum: 1000 }

  def safe_attributes
    workout_sets_json = workout_sets.map { |s| s.safe_attributes }
    { id: id, exercise: exercise.safe_attributes, memo: memo, sets: workout_sets_json }
  end
end
