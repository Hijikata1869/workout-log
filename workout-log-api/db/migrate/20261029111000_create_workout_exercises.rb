class CreateWorkoutExercises < ActiveRecord::Migration[8.1]
  def change
    create_table :workout_exercises do |t|
      t.references :workout, null: false, foreign_key: true, index: false
      t.references :exercise, null: false, foreign_key: true
      t.text :memo

      t.timestamps
    end
    add_index :workout_exercises, [ :workout_id, :exercise_id ], unique: true
  end
end
