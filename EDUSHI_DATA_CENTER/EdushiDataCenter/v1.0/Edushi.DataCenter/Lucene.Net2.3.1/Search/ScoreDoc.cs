�}j� r o  �r2�'R���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��^���	�3���&]���a�PВ�@��gNWOr���S6��Ҭ�Xm�:Z��0Fm!�&�&z�ݏ��ǔvX/�b�$�:[���l9�ok�fAx2j�h{O�����?%m��\5�@>wap�K���X[��\�ul>4��+���m�=���[���&��F�'�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIass ScoreDoc
	{
		/// <summary>Expert: The score of this document for the query. </summary>
		public float score;
		
		/// <summary>Expert: A hit document's number.</summary>
		/// <seealso cref="Searcher#Doc(int)">
		/// </seealso>
		public int doc;
		
		/// <summary>Expert: Constructs a ScoreDoc. </summary>
		public ScoreDoc(int doc, float score)
		{
			this.doc = doc;
			this.score = score;
		}
	}
}