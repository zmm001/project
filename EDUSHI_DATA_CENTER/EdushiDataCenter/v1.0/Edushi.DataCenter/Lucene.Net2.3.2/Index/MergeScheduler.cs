�}+� r 
  "�Ce�0d���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��D���l�B���"Z�أa�L���@��l	,rz���T
+�ɜ��j�MD��x ^;1�c�&f[˓�����<|a�$�#�YNpaKṐr'��i6z}�htY���N��~v��G>�Bm�Li�7����CC�E��j禊e�:�ըo5���&���e�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yI  The default
	/// MergeScheduler is {@link ConcurrentMergeScheduler}.
	/// <p><b>NOTE:</b> This API is new and still experimental
	/// (subject to change suddenly in the next release)</p>
	/// </summary>
	
	public abstract class MergeScheduler
	{
		
		/// <summary>Run the merges provided by {@link IndexWriter#GetNextMerge()}. </summary>
		public abstract void  Merge(IndexWriter writer);
		
		/// <summary>Close this MergeScheduler. </summary>
		public abstract void  Close();
	}
}