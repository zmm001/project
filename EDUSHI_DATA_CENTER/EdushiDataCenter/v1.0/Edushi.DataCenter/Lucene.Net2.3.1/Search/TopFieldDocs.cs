�}�� r �  ni$�V�B���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��^���	�3���&]���D�_�����xZxs�۷Z,x��ٽ�
a�~��=Lli�c�+(͏���ќrD&�b�:�LOpbZṑ{t�hh�fAw.q�&8���P��|g���  KYU�T�
����_ �2Ehm�Ze����~¸�2!���+��X�A�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�/��D�1z��L^W�D-Խ�|����x��k������Pk��.g�=�������؟Q����.��gB1���j�&I�kћ�HN��
Ht�î�����S��8F�kR�kT��@�^_�(z%Z���\.,�N�ofFæZ��K���ts��쉏��A�:!�ڇ�_'mD~�!-�B��x
�A���W_1���w t��V��a����D2C;rC����w/�D;G��#$���%x��s�1C25�)�ͫ� 8я��>o�~��5�s�Y1L�N�Zrxә��V�Khh 8_d�lN��۾���C����?�(�9d��(�u�Z�[�Kӭ}TL�Z}q�cc�DX�M&~������;?r���4�58��Y�a~��F:P;o��4��QW��Y:�!�d�L���*ry	��n��ا���ކ�=�LH�~����j0B���n����e��q� 轳�2���)3���U�x���Y�(#��̪q�<param name="totalHits"> Total number of hits for the query.
		/// </param>
		/// <param name="scoreDocs"> The top hits for the query.
		/// </param>
		/// <param name="fields">    The sort criteria used to find the top hits.
		/// </param>
		/// <param name="maxScore">  The maximum score encountered.
		/// </param>
		internal TopFieldDocs(int totalHits, ScoreDoc[] scoreDocs, SortField[] fields, float maxScore) : base(totalHits, scoreDocs, maxScore)
		{
			this.fields = fields;
		}
	}
}