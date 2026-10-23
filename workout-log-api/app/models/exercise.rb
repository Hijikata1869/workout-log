class Exercise < ApplicationRecord
  belongs_to :user

  before_validation :sanitize_name

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 50 }

  private

    def sanitize_name
      self.name = name&.squish
    end
end
